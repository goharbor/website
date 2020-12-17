---
title: "How to configure harbor with terraform"
description: 
date: 2020-12-17T10:08:18+02:00
author: 
  name: "Brett Wright"
  company: BESTSELLER
showPageInfo: true
---
#### Why write a terraform provider.
At BESTSELLER IT we are big believers in Infrastructure As Code and that as much as possible should be automated. One of the tools we fond of, and utilize heavily, is Terraform. Why not use Terraform to automate the Harbor management?  But there was no Terraform provider for Harbor. :anguished:

What were we going to do? After some time searching on Google, we found an article by Hashicorp about writing a Terraform provider. We not give it a go? Harbor has an api we can use. And guess what, we were able to write a Terraform provider for Harbor fulfilling our needs and keeping everything as Infrastructure As Code.

## How to automate Harbor configuration.
In this blog we will show you how you can configure Harbor using Terraform and the [terraform-provider-harbor](https://github.com/BESTSELLER/terraform-provider-harbor ), written by BESTSELLER IT. The full terraform-provider-harbor documentation is available at https://registry.terraform.io/providers/BESTSELLER/harbor/latest.

This blog assumes that already have Harbor installed. If not, check [this out](https://goharbor.io/docs/2.1.0/install-config/quick-install-script/).

First let's create a `provider.tf` file where we can specify the version of the terraform-provider-harbor and the credentials on how the provider is going to connect the Harbor api.

```hcl
terraform {
  required_providers {
    harbor = {
      source = "BESTSELLER/harbor"
      version = "1.0.0"
    }
  }
}
	 
provider "harbor" {
  url      = "http://core.harbor.domain"
  username = "admin"
  password = "Harbor12345"
  insecure = true
}
```
Run the command `terraform init`. This will download the Terraform provider from the above example, which is needed to configure your installation of Harbor.
![](https://storage.googleapis.com/bs-blog-images/goharbor-terraform/terraform-init.png)

Once we have this code in place and performed a `terraform init`. We are now ready to start configuring Harbor with Terraform. Let’s start by creating a project named `vessel` where we can store our docker images and helm charts

Let's create a `main.tf` file and add the below code.

```hcl
resource "harbor_project" "vessel" {
    name = "vessel"
}
```
Now run the command `terraform apply`. This will create a plan where we will be able see what resources will be created. If we are satisfied with the changes we can confirm the creation by typing `yes`.

![](https://storage.googleapis.com/bs-blog-images/goharbor-terraform/apply-project.png)

**All applied!** But did this actually work? Let's confirm the creation of the resource via the Harbor GUI.
![](https://storage.googleapis.com/bs-blog-images/goharbor-terraform/project.png)

That worked like a charm. Now let's create a user account called `Captain Kube` using the `harbor_user` resource. Add the following code to the `main.tf` file and run the `terraform apply` command again.
```hcl
resource "harbor_user" "captain" {
  username  = "kube"
  password  = "Password12345!"
  full_name = "Captain Kube"
  email     = "captain.kube@kubernetes.com"
} 
```

Again let's just confirm the creation of this account via the GUI.
![](https://storage.googleapis.com/bs-blog-images/goharbor-terraform/user.png)

Now that we have a user account and a project, we can give `Captain Kube` developer access to the `vessel` project by using the Terraform resource `harbor_project_member_user`.

```hcl
resource "harbor_project_member_user" "kube" {
  project_id = harbor_project.vessel.id
  user_name  = harbor_user.captain.username
  role       = "developer"
}
```

Now `Captain Kube` should be able to push and pull docker images, easy right? But the captain wants to automate his docker builds, using his own credentials would unwise. That is why Harbor have [Robot accounts](https://goharbor.io/docs/1.10/working-with-projects/project-configuration/create-robot-accounts/). Let's create a Robot account for the captain. This will allow us to push and pull docker images without using our own credentials, brilliant in a CI/CD scenario where you typically share the pipelines. By adding the below code to the `main.tf` file we can create the robot account.

```hcl
resource "harbor_robot_account" "vessel" {
  name        = harbor_project.vessel.name
  description = "Robot account used to push and pull images from harbor"
  project_id  = harbor_project.vessel.id
  actions      = ["push","pull"]
}
```
Once agin we'll run the `terraform apply` command and confirm `yes` to create the robot account.

![](https://storage.googleapis.com/bs-blog-images/goharbor-terraform/apply-robot.png)

Please note you can write the robot token to [Hashicorp Vault](https://www.vaultproject.io/) by using the below code.
```hcl
locals {
  robot-prefix = "robot$"
}

resource "vault_generic_secret" "vessel" {
  path = "secret/service_accounts/harbor/${harbor_robot_account.vessel.name}"
  data_json = jsonencode(
    {
      "username" = "${local.robot-prefix}${harbor_robot_account.vessel.name}",
      "password" = "${harbor_robot_account.vessel.token}"
    }
  )
}
```

## Final Words
With the Terraform provider in place, it is pretty easy to create a whole setup for our `Captain Kube` user and on the benefits of doing it with Terraform is we always know the desired state. We have focused on the features that we utilize within BESTSELLER IT so if you would be like to contribute, report a bug or request a new feature please don't hesitate, just go to https://github.com/BESTSELLER/terraform-provider-harbor.

You can find the examples on our github account https://github.com/BESTSELLER/blog-harbor-example.

The latest documentation can be found at https://registry.terraform.io/providers/BESTSELLER/harbor/latest/docs.

All the best from BESTSELLER IT.




