package com.example.ebook_back.serviceimpl;


import com.example.ebook_back.service.TimerService;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@Scope("session")
public class TimerServiceImpl implements TimerService {

    private long startTime;

    @Override
    public void startTimer() {
        this.startTime = System.currentTimeMillis();
    }

    @Override
    public long stopTimer() {
        if (this.startTime == 0) {
            return 0;
        }

        long duration = System.currentTimeMillis() - this.startTime;
        this.startTime = 0;
        return duration;
    }
}
