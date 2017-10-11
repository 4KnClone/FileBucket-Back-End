#!/bin/bash
TOKEN=iK/dGfaKxBNfSG4i2Z+FJxVWijc78zV73MhlkU4J8mE=--oj/MYt9wBORrEsm2mSH7T6XaF3KPpE6Z7GH8BOwn+Yw=

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
