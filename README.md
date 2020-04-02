# BoJack
A GraphQL Server Side Downloader from Jamstack

### Init
 --> Api Helper
 --> default config
 
### Launch
```
bj.start([fileData])
fileData :: see default/dataFile.js
```

### Callbacks
callbacks are calls in this order:
`byQueries` is ` { queryName: data => { return data } }`
take the date from the given query
`assets` is ` assetsData => { return assetsData}`
all assets match data will be call with this fonction
`global` is `(data) => { return data }`
take all data and should return new formatted Data
