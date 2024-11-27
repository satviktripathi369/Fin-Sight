#!/bin/bash

kops create cluster --name=kube.proddeploy.xyz --state=s3://kopsstatebucketmanav --zones=us-east-1a,us-east-1b --node-count=2 --node-size=t3.small --master-size=t3.medium --dns-zone=kube.proddeploy.xyz --node-volume-size=8 --master-volume-size=8

kops update cluster --name kube.proddeploy.xyz --state=s3://kopsstatebucketmanav --yes --admin

kops validate cluster --state=s3://kopsstatebucketmanav --wait 10m

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.0-beta.0/deploy/static/provider/aws/deploy.yaml
