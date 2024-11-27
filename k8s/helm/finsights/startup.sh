#!/bin/bash

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.0-beta.0/deploy/static/provider/aws/deploy.yaml

kubectl apply --validate=false -f https://github.com/jetstack/cert-manager/releases/download/v1.12.1/cert-manager.yaml
