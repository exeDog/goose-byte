#!/usr/bin/env bash

URL_BASE="https://d300ed923bd6.ngrok.io"
URL="${URL_BASE}/scan"

echo "${URL}"

curl -F 'data=@../sample-malware-1.js' ${URL}

echo
