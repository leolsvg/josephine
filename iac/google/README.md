https://github.com/hashicorp/terraform-provider-google/issues/17998
https://stackoverflow.com/questions/77275301/google-cloud-application-default-credentials-permission-denied-quota-project-n

Check https://console.cloud.google.com/apis/credentials to get the api key

```sh
gcloud services enable cloudresourcemanager.googleapis.com --project=<project-id>
```
