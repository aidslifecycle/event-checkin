$url = "https://actnow.tofighthiv.org/aidslifecycle/parts/participants.json"
$output = "$PSScriptRoot\js\participants.json"
$start_time = Get-Date

Invoke-WebRequest -Uri $url -OutFile $output