# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141124094556) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "carts", force: true do |t|
    t.integer  "user_id"
    t.float    "usd_rate",       default: 0.0
    t.float    "delivery_price", default: 0.0
    t.float    "total_price",    default: 0.0
    t.boolean  "confirmed",      default: false
    t.string   "status",         default: "pending"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
  end

  create_table "categories", force: true do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "firms", force: true do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "positions", force: true do |t|
    t.integer  "cart_id"
    t.integer  "product_id"
    t.integer  "count",           default: 1
    t.float    "price",           default: 0.0
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.float    "sum",             default: 0.0
    t.float    "usd_price"
    t.boolean  "fixed_rub_price", default: false
  end

  create_table "products", force: true do |t|
    t.string   "name"
    t.integer  "type"
    t.float    "price"
    t.text     "description"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.integer  "category_id"
    t.integer  "firm_id"
    t.string   "image"
    t.float    "usd_price"
    t.boolean  "fixed_rub_price", default: false
    t.boolean  "available",       default: true
    t.boolean  "exist",           default: true
    t.boolean  "hidden",          default: false
  end

  create_table "settings", force: true do |t|
    t.text     "main_page_text"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.text     "contacts_text"
    t.float    "usd_rate"
    t.boolean  "recalculatable",    default: true
    t.string   "default_sort_type", default: "firm"
  end

  create_table "user_providers", force: true do |t|
    t.integer  "user_id"
    t.string   "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: true do |t|
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "identity"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "father_name"
    t.string   "address"
    t.string   "mobile"
    t.boolean  "is_admin",               default: false
  end

  add_index "users", ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
