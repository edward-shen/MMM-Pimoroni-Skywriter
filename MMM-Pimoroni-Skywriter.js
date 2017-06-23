Module.register("MMM-Pimoroni-Skywriter", {
    defaults: {
    },
    
    getStyles: function() {
        return ["font-awesome.css"];
    },
    
    start: function() {
        this.text = "loading";
        // Initialize Socket connection. Yes, this is necessary.
        // This may have caused an hour of frustration.
        this.sendSocketNotification();
        
    },
    
    getDom: function() {
        var wrapper = document.createElement("div");
        wrapper.innerHTML = this.text;
        return wrapper;
    },
    
    socketNotificationReceived: function(notification, payload) {
        if (notification === "ACTION") {
            this.text = payload;
            this.updateDom();
            
            if (payload === "east, west") {
                this.sendNotification("PAGE_INCREMENT");
            } else if (payload === "west, east") {
                this.sendNotification("PAGE_DECREMENT");
            }
        }
    }
});
