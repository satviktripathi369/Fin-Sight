#!/bin/bash

kubectl apply --validate=false -f https://github.com/jetstack/cert-manager/releases/download/v1.12.1/cert-manager.yaml

kubectl apply -f argo-cd-repo.yaml 

kubectl apply -f argo-cd-app.yaml  
