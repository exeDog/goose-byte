#!/usr/bin/env bash

clear

URL_BASE="https://d300ed923bd6.ngrok.io"
URL="${URL_BASE}/scan"

echo "${URL}"
echo "Should detect no threat"
curl -s -F 'data=@../sample-non-malware-1.js' ${URL} | jq

echo
