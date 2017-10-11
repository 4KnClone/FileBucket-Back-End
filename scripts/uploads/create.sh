#!/bin/bash
TOKEN=C4JyNfnrWnUgb/MmUIb6yRnF8rWbNB0YtoHOfWE0HQM=--MY98hO0w3fmTlF89k5D+7ziGz+F4mt+pzj3qCVfuyR8= NAME=upload TAGS=boston

API="http://localhost:4741"
URL_PATH="/uploads"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "upload": {
      "name": "'"${NAME}"'",
      "tags": "'"${TAGS}"'"
    }
  }'

echo
