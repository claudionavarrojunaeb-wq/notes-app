
````
$body = @{
    name = "claudio"
    email = "claudio.navarro@junaeb.cl"
    password = "123123"
} | ConvertTo-Json

Invoke-RestMethod `
    -Uri "http://localhost:3000/api/auth/register" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body

```
PS C:\Users\claudio.navarro> $body = @{
>>     name = "claudio"
>>     email = "claudio.navarro@junaeb.cl"
>>     password = "123123"
>> } | ConvertTo-Json
>>
>> Invoke-RestMethod `
>>     -Uri "http://localhost:3000/api/auth/register" `
>>     -Method POST `
>>     -ContentType "application/json" `
>>     -Body $body

name    email                     password
----    -----                     --------
claudio claudio.navarro@junaeb.cl 123123