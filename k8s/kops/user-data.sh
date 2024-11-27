#!/bin/bash

# Define the version of kops to install
KOPS_VERSION="v1.25.4"

# Download the kops binary for Linux x86_64
echo "Downloading kops $KOPS_VERSION for Linux x86_64..."
wget https://github.com/kubernetes/kops/releases/download/$KOPS_VERSION/kops-linux-amd64 -O kops

# Make the binary executable
echo "Making kops executable..."
chmod +x kops

# Move the binary to /usr/local/bin
echo "Moving kops to /usr/local/bin..."
sudo mv kops /usr/local/bin/kops

# Verify installation
echo "Verifying kops installation..."
kops version

echo "kops installation complete."
