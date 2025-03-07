#!/bin/bash

project_name=${PWD##*/}

if [ ! -f .gitignore ]; then
    echo "Creating .gitignore..."
    echo "node_modules/" > .gitignore
elif ! grep -q "^node_modules/$" .gitignore; then
    echo "node_modules/ is missing in .gitignore. Adding it now..."
    echo "node_modules/" >> .gitignore
fi

git init
git add .
git commit -m "Initial commit: Setup Next.js $project_name project"

gh repo create "$project_name" --public --source=. --remote=origin

git branch -M main
git push -u origin main

gh repo view --web