#!/bin/bash

kops create cluster --name=kube.proddeploy.xyz --state=s3://kopsstatebucketmanav --zones=us-east-1a,us-east-1b --node-count=2 --node-size=t3.small --master-size=t3.medium --dns-zone=kube.proddeploy.xyz --node-volume-size=8 --master-volume-size=8

kops update cluster --name kube.proddeploy.xyz --state=s3://kopsstatebucketmanav --yes --admin

kops validate cluster --state=s3://kopsstatebucketmanav

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.0-beta.0/deploy/static/provider/aws/deploy.yaml

kubectl apply --validate=false -f https://github.com/jetstack/cert-manager/releases/download/v1.12.1/cert-manager.yaml

helm install redis-cluster bitnami/redis --set architecture=replication,auth.enabled=false

kubectl get svc -n ingress-nginx

kubectl get pods -n cert-manager

kubectl create -f cluster-issuer.yaml

kubectl create -f ml-deployment.yml

kubectl create -f ml-service.yml

kubectl create -f backend-cm.yml

kubectl create -f backend-deployment.yml

kubectl create -f backend-service.yml

kubectl create -f ingress-backend.yml

kubectl create -f frontend-cm.yml

kubectl create -f frontend-deployment.yml

kubectl create -f frontend-service.yml

kubectl create -f ingress-frontend.yml


