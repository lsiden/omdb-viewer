#!/bin/bash

# Inserts <base href="/$name"/> into HTML head.

if [[ $# -lt 1 ]]; then
  echo "Usage: post-build.sh <name>"
  exit 1
fi
grep '<base ' build/index.html > /dev/null && exit 0
name=$1
tmp=$(mktemp -p /tmp index.html.XXX)
sedcmd="s!<head>!&<base href="/$name/">!i"
sed "$sedcmd" build/index.html > $tmp && mv $tmp build/index.html
