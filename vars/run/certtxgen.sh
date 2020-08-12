#!/bin/bash
cd $FABRIC_CFG_PATH
cryptogen generate --config crypto-config.yaml --output keyfiles
configtxgen -profile OrdererGenesis -outputBlock genesis.block -channelID systemchannel

configtxgen -printOrg organization_x-com > JoinRequest_organization_x-com.json
configtxgen -printOrg organization_y-com > JoinRequest_organization_y-com.json
configtxgen -printOrg organization_z-com > JoinRequest_organization_z-com.json
configtxgen -printOrg university-com > JoinRequest_university-com.json
configtxgen -printOrg university1-com > JoinRequest_university1-com.json
configtxgen -printOrg university2-com > JoinRequest_university2-com.json
