#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
if which node > /dev/null
  then
      echo "node is installed, skipping..."
  else
      echo "Installing Node ..."
      curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
      sudo apt-get install nodejs -y
      echo "Node has been installed."
  fi
  
sudo apt install pigpio
cd $DIR
npm install
