find -E . -regex '.*\.(php|json|styl|js|css|twig|md)'  -print0 | xargs -0 sed -i '' -e 's/Quiz/Promo/g'
