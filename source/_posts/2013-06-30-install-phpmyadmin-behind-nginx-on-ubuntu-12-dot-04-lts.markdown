---
layout: post
title: "Install phpmyadmin behind nginx on ubuntu 12.04 LTS"
date: 2013-06-30 12:40
comments: true
categories: phpmyadmin nginx fastcgi mysql ubuntu 12.04 lts precise
published: true
author: Ankur Agarwal
---

## Setup dependencies

Setup Php, mysql & phpmyadmin:

      sudo apt-get install php5-fpm php-apc mysql-server mysql-client phpmyadmin nginx

Enter your MySQL password and phpmyadmin webinterface password when prompted


Enable mysql extension by editing /etc/php5/fpm/php.ini

    sudo vim /etc/php5/fpm/php.ini

Add the following line and save

    extension=mysql.so

Restart to use new config

      sudo /etc/init.d/php5-fpm restart
      sudo /etc/init.d/nginx restart

## Setup Nginx config:

Next create a basic nginx vhost configuration in /etc/nginx/sites-available/ directory as follows:

    sudo vim /etc/nginx/sites-available/phpmyadmin

And add the following:


    server {

           listen 80;
           server_name admin.lvh.me lvh.me;
           root /var/www/phpmyadmin;
           if ($http_host != "admin.lvh.me") {
                     rewrite ^ http://admin.lvh.me$request_uri permanent;
           }
           index index.php index.html;
           location = /favicon.ico {
                    log_not_found off;
                    access_log off;
           }
           location = /robots.txt {
                    allow all;
                    log_not_found off;
                    access_log off;
           }
           # Make sure files with the following extensions do not get loaded by nginx because nginx would display the source code, and these files can contain PASSWORDS!
            location ~* \.(engine|inc|info|install|make|module|profile|test|po|sh|.*sql|theme|tpl(\.php)?|xtmpl)$|^(\..*|Entries.*|Repository|Root|Tag|Template)$|\.php_ {
                    deny all;
            }
           # Deny all attempts to access hidden files such as .htaccess, .htpasswd, .DS_Store (Mac).
           location ~ /\. {
                    deny all;
                    access_log off;
                    log_not_found off;
           }
           location ~*  \.(jpg|jpeg|png|gif|css|js|ico)$ {
                    expires max;
                    log_not_found off;
           }
           location ~ \.php$ {
                    try_files $uri =404;
                    include /etc/nginx/fastcgi_params;
                    fastcgi_pass 127.0.0.1:9000;
                    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
           }

           location /phpmyadmin {
                   root /usr/share/;
                   index index.php index.html index.htm;
                   location ~ ^/phpmyadmin/(.+\.php)$ {
                           try_files $uri =404;
                           root /usr/share/;
                           fastcgi_pass 127.0.0.1:9000;
                           fastcgi_index index.php;
                           fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
                           include /etc/nginx/fastcgi_params;
                   }
                   location ~* ^/phpmyadmin/(.+\.(jpg|jpeg|gif|css|png|js|ico|html|xml|txt))$ {
                           root /usr/share/;
                   }
            }
            location /phpMyAdmin {
                   rewrite ^/* /phpmyadmin last;
            }
    }


To enable that vhost, we create a symlink to it from the /etc/nginx/sites-enabled/ directory:

    cd /etc/nginx/sites-enabled/
    sudo ln -s /etc/nginx/sites-available/phpmyadmin phpmyadmin

Reload nginx for the new configuration to take effect:

    sudo /etc/init.d/nginx reload


Open the link in the browser [http://admin.lvh.me/phpmyadmin](http://admin.lvh.me/phpmyadmin)