class CreateAnswer < ActiveRecord::Migration[5.2]
  def change
    create_table :answers do |t|
      t.string :parameter_match, null: false, index: true
      t.string :intent, null: false, index: true
      t.text :response, null: false
      t.timestamps
    end

    add_index :answers, [:parameter_match, :response, :intent]
  end
end
