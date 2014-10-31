Rails.application.routes.draw do

  root :to => 'products#main'

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" } #, :defaults => { :provider => 'vkontakte' }

  resources :users, :only => [:index, :destroy] do
    get 'omniauth_callbacks/vkontakte'
  end

  resources :products
  get '/main_content' => 'products#main_content'
  get '/get_category_and_firm_options' => 'products#get_category_and_firm_options'
  post '/create_category_or_firm_option' => 'products#create_category_or_firm_option'
  delete '/delete_category_or_firm_option' => 'products#delete_category_or_firm_option'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
