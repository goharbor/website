---
title: Create Project Robot Accounts
weight: 40
---

Harbor allows you to use a projeect robot account to automate running operations for a project including,

* Push artifacts
* Pull artifacts
* Delete artifacts
* Read Helm charts
* Create a Helm chart version
* Delete a Helm chart version
* Create a tag
* Delete a tag
* Create artifact labels
* Create a scan

A project robot account uses authenticates to your Harbor instance using a secret, allowing you to connect to your Harbor instance through the OCI client or Harbor API to automate tasks. Robot Accounts cannot log in to the Harbor interface.

A project robot account can only perform actions within the project that it is created in, however, Harbor v2.2 introduces the ability for system administrators to create system robot accounts in addition to creating project robot account that can automate tasks across multiple projects. Read more about [system level robot accounts](../../administration/robot-accounts/).

{{< important >}}
Harbor 2.2 introduced changes to project robot accounts that impact existing robot accounts created in Harbor versions before v2.2. Read more about [legacy robot accounts](#legacy-robot-accounts).
{{< /important >}}

## View Project Robot Accounts

1. Log in to the Harbor interface with an account that has at least project administrator privileges.
1. Go to **Projects**, select a project, and select **Robot Accounts**.

![Project robot accounts page](../../../img/project-robot-account.png)

This page lists all available system robot accounts for a project. The table lists the following information for each robot account,

* The name of the robot account. This is derived from robot account prefix configured for your Harbor instance, the project name, and the name assigned to the robot account when it was created. A robot account name follows the format `<prefix><project_name>+<account_name>`. If you use the search function on this page, you only need to search for the account name without the prefix.
* The enabled status shows if an account is enabled or disabled.
* Click the **Permission(s)** dropdown to view the permissions granted to the robot account.

![View a project robot account permissions](../../../img/permissions-link.png)

* The created time shows when the robot account was created.
* The expires at time of the project account which is calculated based on the created time and the expiration time set when creating the project robot account.
* The description of the project robot account.

You are only able to see project robot accounts from this page. Harbor administrators can also see system robot account information on the [System Robot Account](../../administration/robot-accounts/) page.

## Add a Robot Account

1. Log in to the Harbor interface with an account that has at least project administrator privileges.
1. Go to **Projects**, select a project, and select **Robot Accounts**.
1. Click **New Robot Account**.
1. Enter a name and an optional description for this robot account.
1. Set expiration time for this robot account, you can also select checkbox **Never Expired** if you want to create a never expiring robot account.
1. Click **Permission(s)** to grant permission to the robot account.

    ![Add a robot account](../../../img/add-robot-account-2.png)

1. Click **Add**.
1. In the confirmation window, click **Export to File** to download the access token as a JSON file, or click the clipboard icon to copy its contents to the clipboard.

   ![copy_robot_account_token](../../../img/copy-robot-account-token.png)

   {{< important >}}
   Harbor does not store robot secret tokens, so you must either download the secret or copy and paste its contents into a text file. There is no way to get the secret from Harbor after you have created the robot account, however you are able refresh the secret after the robot account is created.
   {{< /important >}}

   The new robot project account appears as `<prefix><project_name>+<account_name>` in the list of project robot accounts. The prefix is set by your Harbor administrator and is the same for all robot accounts. Read more about [robot account prefixes](/administration/robot-accounts/#configure-robot-account-prefix).

   ![New robot account](../../../img/project-robot-account.png)

## Edit, Disable, or Delete a Project Robot Account

You are able to edit, disable, or delete a project robot account.

1. From a project's **Robot Account** page, select the checkbox next to the robot account you are updating.
1. Select **Action** and then **Edit**, **Disable**, or **Delete**.

  ![Disable or delete a robot account](../../../img/disable-delete-project-robot-account.png)

## Refresh Project Robot Account Secret

You can refresh a robot account's secret after its created in the event that you need a new one.

1. From the administrator **Robot Account** page, select the checkbox next to the robot account you are updating.
1. Select **Action** and then **Refresh Secret**.
1. By default Harbor will generate a new secret randomly, or you can choose to enable manually reseting the secret and entering the **New Secret** then **Confirm Secret**.

    ![Refresh project robot account secret](../../../img/refresh-project-robot-account-token.png)

1. Click **Refresh**. If you created a secret randomly, download the secret JSON file or copy and paste its contents.


## Authenticate with a Project Robot Account

To use a robot account in an automated process, for example, use `docker login` and provide the credentials of the robot account.

```
docker login <harbor_address>
Username: <prefix><project_name>+<account_name>
Password: <secret>
```

## Legacy Robot Accounts

Robot accounts created before Harbor v2.2 are considered legacy robot accounts and will appear with a **Legacy** label in the Harbor v2.2 and later interface.

Legacy robot accounts functionality is still available in Harbor 2.2, but it will be removed in a future version of Harbor. Its strongly recommended that you recreate your legacy robot accounts as either a project or system robot accounts after upgrading to Harbor v2.2. Note that there is currently no way to migrate legacy robot accounts into the new format, you must create a new account.

Legacy robot accounts functionality
* You are able to perform operations by using the Docker and Helm CLIs. A Legacy robot account can't log into the Harbor interface.
* You can't edit a legacy robot account. You are only able to disable or delete legacy robot accounts.
* Available legacy robot accounts permissions are limited to pushing and pulling artifact, and pushing or pulling a Helm Chart.
* Legacy robot accounts use a JWT for authentication. You are not able to refresh or retrieve a legacy robot account JWT authentication token.
* Legacy robot accounts names use the prefix `robot$`, for example `robot$<account_name>`
