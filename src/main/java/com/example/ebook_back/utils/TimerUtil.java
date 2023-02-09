package com.example.ebook_back.utils;

public class TimerUtil {

    private long startTime = 0;

    public void startTimer() {
        this.startTime = System.currentTimeMillis();
    }

    public long stopTimer() {
        if (this.startTime == 0) {
            return 0;
        }

        long duration = System.currentTimeMillis() - this.startTime;
        this.startTime = 0;
        return duration;
    }

}
