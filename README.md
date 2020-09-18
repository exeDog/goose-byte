# goose-byte-hackathon
Hackathon project by team Goose Byte

Bad actors are submitting obfuscated javascript files that are used for skimming/exfiltration.

This project is the basis of an external service where user generated content (UGC) is scanned for malicious behavior.

Indicators we are focusing on 
- \x## 8-bit character specification where # is a hex digit
 
## Environment

### Nodejs
`nvm use`

## Discussion
- [considerations-parsing-and-detection.js](considerations-parsing-and-detection.js) contains thoughts on how we can parse and detect malware scripts 
