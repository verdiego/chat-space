if @new_messages.present?
  json.array! @new_messages do |new_message|
    json.id new_message.id
    json.user_name new_message.user.name
    json.created_at new_message.created_at.to_s
    json.content new_message.content
  end
end
