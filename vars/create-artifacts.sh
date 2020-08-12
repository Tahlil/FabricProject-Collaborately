SYS_CHANNEL="sys-channel"
CHANNEL_NAME="globalchannel"

echo $CHANNEL_NAME

# Generate System Genesis block
configtxgen -profile OrdererGenesis -configPath . -channelID $SYS_CHANNEL  -outputBlock ./genesis.block

# Generate channel configuration block
configtxgen -profile BasicChannel -configPath . -outputCreateChannelTx ./globalchannel.tx -channelID $CHANNEL_NAME
