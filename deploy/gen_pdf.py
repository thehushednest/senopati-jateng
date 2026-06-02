#!/usr/bin/env python3
"""Render an HTML file to a print-ready A4 PDF via headless Chromium (Playwright).
Usage: python gen_pdf.py <input.html> <output.pdf>
Used by deploy_asksenopati.sh to keep the downloadable company-profile PDF in
sync with profile.html. Exits non-zero on failure so the caller can fall back
to the committed PDF.
"""
import sys, os, pathlib

def main():
    if len(sys.argv) != 3:
        print("usage: gen_pdf.py <input.html> <output.pdf>"); return 2
    src = pathlib.Path(sys.argv[1]).resolve()
    out = pathlib.Path(sys.argv[2]).resolve()
    if not src.exists():
        print("input not found:", src); return 2
    try:
        from playwright.sync_api import sync_playwright
    except Exception as e:
        print("playwright unavailable:", e); return 3
    url = src.as_uri()
    with sync_playwright() as p:
        browser = p.chromium.launch(args=["--no-sandbox"])
        pg = browser.new_context().new_page()
        try:
            pg.goto(url, wait_until="networkidle", timeout=60000)
        except Exception:
            pg.goto(url, wait_until="load", timeout=60000)
        pg.wait_for_timeout(1500)           # settle webfonts
        pg.emulate_media(media="print")
        pg.pdf(path=str(out), format="A4", print_background=True,
               margin={"top": "0", "right": "0", "bottom": "0", "left": "0"})
        browser.close()
    print("PDF written:", out)
    return 0

if __name__ == "__main__":
    sys.exit(main())