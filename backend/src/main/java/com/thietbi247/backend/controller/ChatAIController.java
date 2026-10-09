package com.thietbi247.backend.controller;


import com.thietbi247.backend.constant.SuccessCode;
import com.thietbi247.backend.dto.request.ChatAIRequest;
import com.thietbi247.backend.dto.responsitory.ChatAIReponse;
import com.thietbi247.backend.service.ChatAIService;
import com.thietbi247.backend.util.ApiResponseUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class ChatAIController {
    private final ChatAIService service;

    public ChatAIController(ChatAIService service) {
        this.service = service;
    }

    @PostMapping("/chat_AI")
    public ResponseEntity<ChatAIReponse> chatImage(@RequestParam(value = "file", required = false) MultipartFile file,
                                                    @RequestParam("message")String message){
        var data =  service.chatImageOptional(file, message);
        return ApiResponseUtil.success(data, SuccessCode.AI_CHAT_SUCCESS);
    }

}
