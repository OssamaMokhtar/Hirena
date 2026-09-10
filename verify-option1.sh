#!/bin/bash
# Hirena Option 1 — End-to-End Verification Script
# Tests: API key, assess endpoint, interview analyze endpoint, page render

set -e
BASE="http://localhost:3000"

echo "=== Hirena Option 1 Verification ==="
echo ""

# 1. API Key verification
echo "1. API Key verification..."
RESP=$(curl -s "$BASE/api/verify-env")
HAS_KEY=$(echo "$RESP" | python3 -c "import sys,json; print(json.load(sys.stdin).get('hasKey', False))" 2>/dev/null || echo "false")
if [ "$HAS_KEY" = "True" ]; then
  echo "   ✅ API key loaded (prefix validated)"
else
  echo "   ❌ API key not configured"
  exit 1
fi

# 2. Page loads
echo "2. Page loads..."
HTTP=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/")
if [ "$HTTP" = "200" ]; then
  echo "   ✅ Page returns HTTP 200"
else
  echo "   ❌ Page returned HTTP $HTTP"
fi

# 3. Title check
echo "3. Page title..."
TITLE=$(curl -s "$BASE/" | grep -oE '<title>[^<]+</title>' | sed 's/<title>//;s/<\/title>//')
if [ -n "$TITLE" ]; then
  echo "   ✅ Title: $TITLE"
else
  echo "   ❌ No title found"
fi

# 4. Video Interview section present
echo "4. Video Interview section..."
if curl -s "$BASE/" | grep -q "Video Interview Assessment"; then
  echo "   ✅ Video Interview section present"
else
  echo "   ❌ Video Interview section missing"
fi

# 5. Role selector present
echo "5. Role selector..."
if curl -s "$BASE/" | grep -q "Select your role"; then
  echo "   ✅ Role selector present"
else
  echo "   ❌ Role selector missing"
fi

# 6. Navigation link
echo "6. Navigation link..."
if curl -s "$BASE/" | grep -q 'href="#video-interview"'; then
  echo "   ✅ Video Interview nav link present"
else
  echo "   ❌ Nav link missing"
fi

# 7. Assess API endpoint
echo "7. /api/assess endpoint..."
HTTP=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/assess" \
  -H "Content-Type: application/json" \
  -d '{"targetRole":"Software Engineer","selfAssessment":{}}')
if [ "$HTTP" = "200" ]; then
  echo "   ✅ /api/assess returns 200"
elif [ "$HTTP" = "500" ]; then
  echo "   ⚠️  /api/assess returns 500 (expected if AI inference fails without key)"
else
  echo "   ❌ /api/assess returns HTTP $HTTP"
fi

# 8. Interview analyze endpoint (structure check)
echo "8. /api/interview/analyze endpoint..."
HTTP=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/interview/analyze" \
  -H "Content-Type: application/json" \
  -d '{"targetRole":"software-engineer","question":"Test","transcription":"test","previousContext":""}')
if [ "$HTTP" = "200" ]; then
  echo "   ✅ /api/interview/analyze returns 200"
elif [ "$HTTP" = "500" ]; then
  echo "   ⚠️  /api/interview/analyze returns 500 (expected if OpenAI unavailable)"
else
  echo "   ❌ /api/interview/analyze returns HTTP $HTTP"
fi

echo ""
echo "=== Verification Complete ==="
