#!/usr/bin/env bash

clear

URL_BASE="https://d300ed923bd6.ngrok.io"
URL="${URL_BASE}/scan"

echo "${URL}"
echo "Should determine that a threat is detected"
curl -s -F 'data=@../sample-malware-1.js' ${URL} | jq

echo
