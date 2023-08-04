#!/bin/bash

# Function to create a new repository on GitHub using the GitHub API.
function create_github_repo() {
  local repo_name=$1
  local repo_description=$2
  local repo_visibility=$3
  local full_repo_name="${GITHUB_REPO_PREFIX}-${repo_name}"

  curl -u "$GITHUB_USERNAME:$GITHUB_ACCESS_TOKEN" \
    -d '{"name": "'"${full_repo_name}"'", "description": "'"${repo_description}"'", "private": '"${repo_visibility}"'}' \
    -H "Content-Type: application/json" \
    -X POST https://api.github.com/user/repos
}

# Function to initialize Git and push the code to the newly created remote repository.
function initialize_and_push_git() {
  local repo_name=$1
  local full_repo_name="${GITHUB_REPO_PREFIX}-${repo_name}"

  git init
  git add .

  # Create and write to the .gitignore file
  cat <<EOL > .gitignore
# Ignore node_modules directory
node_modules/

# Ignore .env file (if needed)
.env
EOL

  git commit -m "Initial commit"

  # Check if the "origin" remote already exists
  if git remote | grep -q "origin"; then
    # If the remote exists, update its URL to the new repository URL
    git remote set-url origin "git@github.com:${GITHUB_USERNAME}/${full_repo_name}.git"
  else
    # If the remote does not exist, add the new repository URL as the origin
    git remote add origin "git@github.com:${GITHUB_USERNAME}/${full_repo_name}.git"
  fi

  git branch -M main  # Set the default branch name to "main"
  git push -u origin main
}

# Function to create README.md with placeholders
function create_readme() {
  local repo_name=$1
  local repo_description=$2
  local full_repo_name="${GITHUB_REPO_PREFIX}-${repo_name}"

  cat <<EOL > README.md
# ${full_repo_name}

${repo_description}
EOL
}

# Main script starts here

# Check if .env file exists; if not, copy from .env.example
if [ ! -f .env ]; then
  cp .env.example .env
fi

# Load environment variables from the .env file
if [ -f .env ]; then
  source .env
else
  echo "Error: .env file not found."
  exit 1
fi

# Prompt the user to enter the GITHUB_REPO_PREFIX interactively, with a default value if empty
read -p "Enter the GitHub repository prefix (default: pack): " GITHUB_REPO_PREFIX
GITHUB_REPO_PREFIX=${GITHUB_REPO_PREFIX:-pack}

# Function to get the repository name from package.json
function get_package_name() {
  local package_name
  package_name=$(jq -r '.name' package.json)
  echo "$package_name"
}

# Prompt the user to enter the repo_name interactively
read -p "Enter the repository name (default: $(get_package_name)): " repo_name
repo_name=${repo_name:-$(get_package_name)}

# Validate the repository name
if ! echo "$repo_name" | grep -E "^[a-zA-Z0-9-]{1,100}$" >/dev/null; then
  echo "Error: Invalid repository name. The name can only contain alphanumeric characters and hyphens, and must be 1 to 100 characters long."
  exit 1
fi

# Prompt the user to enter the repo_description interactively
read -p "Enter the repository description (default: $repo_name): " repo_description
repo_description=${repo_description:-$repo_name}

# Prompt the user to enter the private_or_public option interactively
read -p "Do you want the repository to be private? (true/false, default: true): " private_or_public
private_or_public=${private_or_public:-true}

create_github_repo "$repo_name" "$repo_description" "$private_or_public"
initialize_and_push_git "$repo_name"
create_readme "$repo_name" "$repo_description"
