
# MMM-Pimoroni-Skywriter

![Example of MMM-Pimoroni-Skywriter](./example_picture.png)

This [MagicMirror²][mm] Module is designed to interface the Pimoroni Skywriter.

## Installation

In your terminal, go to your MagicMirror's Module folder:

```bash
cd ~/MagicMirror/modules
```
Clone this repository:
```bash
git clone https://github.com/edward-shen/MMM-Pimoroni-Skywriter.git
```
Configure the module in your config.js file.

Then, you need to run 
```
npm install
```
as this depends on `ws`.

You then also need to create a `systemd` service (Naturally this also requires `systemd`).

Run
```
sudo nano /lib/systemd/system/MMM-Pimoroni-Skywriter.service
```
and paste in the following:

```bash
[Unit]
Description=MagicMirror Module to interface the Pimoroni Skywriter
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/python3 /home/YOUR_USER_HERE/MagicMirror/modules/MMM-Pimoroni-Skywriter/pimoroni-input.py
Restart=always

[Install]
WantedBy=multi-user.target
```

Make sure to change `YOUR_USER_HERE` to your user, which, for most people, will be `pi`.

Then run 
```
sudo systemctl enable MMM-Pimoroni-Skywriter.service
```

## A brief explaination

This is a hack. An ugly hack. A hack that, instead of waiting for websocket, just tries every 15 seconds after boot until a connection is established.

So, lets get your questions answered one by one.

1. **Why aren't you using `pm2`?**

  Unfortunately, PM2 works by chosing a single user and running the commands under said user. Unfortunately, to access the GPIO pins, I need root privileges. So why not run `pm2` as root then? Well, you're then basically running everything on your mirror pi as root. You don't want to do that. Second of all, you'd need to reinstall everything in the root home folder. That makes it a little hard to install. It's a limitation upstream, so the best I can do is divert the problem elsewhere, hence using `systemd` instead.
2. **But other modules can use GPIO pins fine without root!**

  Yes, but that's because they're using a native implementation of accessing the GPIO pins. I'm using a python library.
3. **Python library? Why not just have everything native in js?**

  Two main reasons: First, the original library for the raspberry pi was written in Python. Second, I have no idea how to port libraries, especially for one that works on such a low level. I tried to understand the library, but it was pretty terribly documented. Hell, even their examples were pretty terrible. One variable is just named "`some_value`". No comment, no explaination. You needed to figure out that it was the initialization point for the air wheel gesture. 
4. **Is there anything else I should know?**

  Actually, yes. This module starts another separate websocket server. It runs locally, and only accepts messages if the message originate from the localhost. The python script runs a websocket client.
5. **Wait, why not just use the socket feature native to MagicMirror?**

  Let me quote the *entire* section about the native socketing implementation, detailing *everything* developers should know about it: 

> This is a link to the IO instance. It will allow you to do some Socket.IO magic. In most cases you won't need this, since the Node Helper has a few convenience methods to make this simple.

6. **What does this support


## Using the module

(this was copy-pasted from another module. Under construction.)

To use this module, add it to the modules array in the `config/config.js` file:
```js
modules: [
    {
        module: 'MMM-page-indicator',
        position: 'bottom_bar',
        config: {
            pages: 3,
        }
    }
]
```

## Configuration options

(this was copy-pasted from another module. Under construction.)

Option|Description
------|-----------
`pages`|Number of pages that you have.<br/>**Expected Value type:** `int`.
`activeBright`|Should the active circle be bright.<br/>**Expected Value type:** `boolean`.
`inactiveDimmed`|Should the inactive circles be dimmed?<br/>**Expected Value type:** `boolean`.
`inactiveHollow`|Should the inactive circles be hollow?<br/>**Expected Value type:** `boolean`.

## FAQ

- Help! My module is (above/below) another module in the same region but I want it to be somewhere else!

  The order of your `config.js` determines your module location. If you have two modules, both with `position:bottom_bar`, the one that is first listed will appear on top. The rest will appear in the same order you defined them in. If you want this module to be at the very bottom, define this module as the last module in your `config.js` file. If you want it to be on top in that region, make sure no other module is defined before it that has the same region.
  
- Can I make a pull request?

  Please. This module is a hack. It deserves better.
  
- I want more config options!

  Please make an issue. Thanks!

[mm]: https://github.com/MichMich/MagicMirror
