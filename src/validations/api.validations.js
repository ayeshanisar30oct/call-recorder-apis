const Joi = require('joi');

const supportTiketValidation = Joi.object().keys({
  email: Joi.string().required().email(),
  description: Joi.string().required()
    
});

const selectFreeDeckValidateion = Joi.object().keys({
    subscription_plan_id: Joi.number().required(),
    deck_id: Joi.number().required(),
    type: Joi.string().required(),
      
  });


            const flashCardUserDataValidateion = Joi.object().keys({
                time_before_answer: Joi.number().required(),
                time_on_answer: Joi.number().optional(),
                tooltips_viewed: Joi.array().optional(),
                viewed_at: Joi.date().optional(),
                answer_rating:Joi.number().min(1).max(5).optional()
                  
              });

              const notificationValidation = Joi.object().keys({
                notification: Joi.string().valid('enable', 'disable').required()
                  
              });

              const phoneNumberValidation = Joi.object().keys({
                phone_number: Joi.string().pattern(/^\+[1-9]\d{1,14}$/).required()
                  
              });

              const fcmTokenValidation = Joi.object().keys({

                fcm_token: Joi.string().required()
                  
              });

              const readAlertMessageValidation = Joi.object().keys({

                alert_message_id: Joi.number().required()
                  
              });



module.exports = {supportTiketValidation,
    selectFreeDeckValidateion,
    flashCardUserDataValidateion,
    notificationValidation,
    fcmTokenValidation,
    readAlertMessageValidation,
    phoneNumberValidation
}