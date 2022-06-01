# dyte-vit-2022-nishit-pandit

## Some basic Commmds
```
./cvers.js --help
./cvers.js -l https://github.com/dyte-in/react-sample-app/ -b main -t axios -v 0.20.1
./cvers.js -f data.csv -b main -t axios -v 0.20.1
./cvers.js -u -f data.csv -b main -t axios -v 0.20.1
```

## Possible Issues
```
CSV input failed -> add the remote repos to be checked in the data.csv file itself
Program doesn't execute -> change the node executable location in cvers.js
PR request command failed -> For the execution, a clone of the remote repo should exist on the user's github
```

