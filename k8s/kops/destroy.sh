#!/bin/bash


kops get cluster --state=s3://kopsstatebucketmanav

kops delete cluster --name kube.proddeploy.xyz --state=s3://kopsstatebucketmanav --yes  
