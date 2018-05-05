json.content @message.content
json.image @message.image
json.user @message.user
json.created_at @message.created_at.strftime("%Y年%m月%d日 %H:%M:%S")
