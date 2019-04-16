class CreateConfig < ActiveRecord::Migration[5.2]
  def change
    create_table :configs do |t|
      t.string :client_access_token, null: false, index: true
      t.string :chatbot_name, null: false, index: true
      t.text :default_fallback_message, null: false
    end
  end
end
