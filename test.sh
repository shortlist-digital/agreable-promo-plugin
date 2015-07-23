find . -name "*.php" -o -name "*.json" -o -name "*.twig"  -print0 | xargs -0 sed -i '' -e 's/quiz/promo/g'
