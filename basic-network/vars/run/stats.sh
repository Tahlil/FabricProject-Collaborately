#!/bin/bash
# Script to instantiate chaincode

declare -a allpeernodes=(peer1.org0.example.com peer2.org0.example.com peer1.org1.example.com peer2.org1.example.com)
for anode in ${allpeernodes[@]}; do
  ss=$(wget -O- -S ${anode}:7061/healthz | jq '.status')
  printf "%20s %s\n" $anode $ss
done

declare -a allorderernodes=(orderer1.example.com orderer2.example.com orderer3.example.com)
for anode in ${allorderernodes[@]}; do
  ss=$(wget -O- -S ${anode}:7060/healthz | jq '.status')
  printf "%20s %s\n" $anode $ss
done
