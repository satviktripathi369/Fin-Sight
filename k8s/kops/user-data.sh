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

# Install the latest kubectl
echo "Downloading the latest kubectl for Linux x86_64..."
KUBECTL_URL=$(curl -s https://dl.k8s.io/release/stable.txt)
wget https://dl.k8s.io/release/$KUBECTL_URL/bin/linux/amd64/kubectl -O kubectl
echo "Making kubectl executable..."
chmod +x kubectl
echo "Moving kubectl to /usr/local/bin..."
sudo mv kubectl /usr/local/bin/kubectl
echo "Verifying kubectl installation..."
kubectl version --client

# Install the latest AWS CLI
echo "Installing the latest AWS CLI..."
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
echo "Verifying AWS CLI installation..."
aws --version
rm -rf awscliv2.zip aws/

# Install the latest Helm
echo "Downloading the latest Helm for Linux x86_64..."
wget https://get.helm.sh/helm-latest-linux-amd64.tar.gz -O helm.tar.gz
echo "Extracting Helm..."
tar -zxvf helm.tar.gz
chmod +x linux-amd64/helm
echo "Moving Helm to /usr/local/bin..."
sudo mv linux-amd64/helm /usr/local/bin/helm
rm -rf helm.tar.gz linux-amd64
echo "Verifying Helm installation..."
helm version

# Install the latest ArgoCD CLI
echo "Downloading the latest ArgoCD CLI for Linux x86_64..."
ARGOCD_LATEST=$(curl -s https://api.github.com/repos/argoproj/argo-cd/releases/latest | grep "browser_download_url.*argocd-linux-amd64" | cut -d '"' -f 4)
wget $ARGOCD_LATEST -O argocd
echo "Making ArgoCD CLI executable..."
chmod +x argocd
echo "Moving ArgoCD CLI to /usr/local/bin..."
sudo mv argocd /usr/local/bin/argocd
echo "Verifying ArgoCD CLI installation..."
argocd version --client

echo "Installation of kops, kubectl, awscli, helm, and ArgoCD CLI complete!"
