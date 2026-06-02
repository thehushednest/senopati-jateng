#!/usr/bin/env bash
# Deploy Senopati Institute landing page to asksenopati.com (apex).
# FULL REPLACE: apex serves the static SSI landing; the old "Senopati Academy"
# proxy (127.0.0.1:3003 / :9000 / websocket) is removed from the apex vhost.
# Idempotent · auto-backup · nginx -t before reload · auto-rollback on failure.
#
# Run as root:   sudo bash deploy_asksenopati.sh
# Roll back:     sudo bash deploy_asksenopati.sh --rollback

set -euo pipefail

SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEBROOT="/var/www/senopati-profile"
AVAIL="/etc/nginx/sites-available/asksenopati.com"
ENABLED="/etc/nginx/sites-enabled/asksenopati.com"
TS="$(date +%Y%m%d-%H%M%S)"
LATEST_BAK_PTR="/etc/nginx/sites-available/.asksenopati.com.last-backup"

if [[ $EUID -ne 0 ]]; then echo "Harus dijalankan sebagai root: sudo bash $0"; exit 1; fi

# ---------------- rollback mode ----------------
if [[ "${1:-}" == "--rollback" ]]; then
  if [[ ! -f "$LATEST_BAK_PTR" ]]; then echo "Tidak ada catatan backup ($LATEST_BAK_PTR). Restore manual dari *.bak.* di sites-available."; exit 1; fi
  BAK="$(cat "$LATEST_BAK_PTR")"
  if [[ ! -f "$BAK" ]]; then echo "File backup tidak ditemukan: $BAK"; exit 1; fi
  cp "$BAK" "$AVAIL"
  if nginx -t; then systemctl reload nginx; echo "✓ Rollback ke $BAK selesai, nginx di-reload."; else echo "✗ nginx -t gagal setelah rollback. Periksa manual."; exit 1; fi
  exit 0
fi

echo "==> 1/5 Deploy file statis ke $WEBROOT"
mkdir -p "$WEBROOT"
cp "$SRC/index.html"   "$WEBROOT/"
cp "$SRC/style.css"    "$WEBROOT/" 2>/dev/null || true
cp "$SRC/main.js"      "$WEBROOT/" 2>/dev/null || true
cp "$SRC/profile.html" "$WEBROOT/" 2>/dev/null || true
rm -rf "$WEBROOT/assets"; cp -r "$SRC/assets" "$WEBROOT/"
chown -R www-data:www-data "$WEBROOT" 2>/dev/null || chown -R root:root "$WEBROOT"
find "$WEBROOT" -type f -exec chmod 644 {} \;
find "$WEBROOT" -type d -exec chmod 755 {} \;

echo "==> 2/5 Backup config lama"
if [[ -f "$AVAIL" ]]; then
  BAK="${AVAIL}.bak.${TS}"
  cp "$AVAIL" "$BAK"
  echo "$BAK" > "$LATEST_BAK_PTR"
  echo "    backup -> $BAK"
fi

echo "==> 3/5 Tulis vhost statis baru"
cat > "$AVAIL" <<'NGINX'
# asksenopati.com — Senopati Institute company-profile landing (static).
# Old "Senopati Academy" app proxy removed (full replace) — see *.bak.* to restore.
server {
    listen 80;
    listen [::]:80;
    server_name asksenopati.com www.asksenopati.com;

    root /var/www/senopati-profile;
    index index.html;
    client_max_body_size 25m;

    # keep ACME path so TLS/cert renewal (certbot) still works
    location ^~ /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(?:css|js|jpe?g|png|webp|gif|ico|svg|woff2?)$ {
        expires 7d;
        add_header Cache-Control "public, max-age=604800";
        access_log off;
    }
}
NGINX

# ensure the site is enabled (symlink)
[[ -L "$ENABLED" || -f "$ENABLED" ]] || ln -s "$AVAIL" "$ENABLED"

echo "==> 4/5 Uji konfigurasi nginx"
if ! nginx -t; then
  echo "✗ nginx -t GAGAL — rollback otomatis ke config lama."
  [[ -n "${BAK:-}" && -f "${BAK:-}" ]] && cp "$BAK" "$AVAIL"
  nginx -t && systemctl reload nginx || true
  exit 1
fi

echo "==> 5/5 Reload nginx"
systemctl reload nginx
echo
echo "✓ SELESAI. asksenopati.com kini menyajikan landing Senopati Institute."
echo "  Verifikasi : curl -sI http://asksenopati.com/ ; curl -s http://asksenopati.com/ | grep -i '<title>'"
echo "  Profil PDF : http://asksenopati.com/profile.html"
echo "  Rollback   : sudo bash $0 --rollback"