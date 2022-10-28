---
title: Create User Accounts in Database Mode
weight: 25
---
	
In database authentication mode, the Harbor system administrator creates user accounts manually. 

1. Log in to the Harbor interface with an account that has Harbor system administrator privileges.
1. Under **Administration**, go to **Users**.

    ![Create user account](../../../img/create-user.png)
1. Click **New User**.
1. Enter information about the new user.

    ![Provide user information](../../../img/new-user.png)

    - The username must be unique in the Harbor system
    - The email address must be unique in the Harbor system
    - The password must contain at least 8 characters with 1 lowercase letter, 1 uppercase letter and 1 numeric character

If users forget their password, they need to ask the administrator to [reset their password](./reset-user-password.md)
