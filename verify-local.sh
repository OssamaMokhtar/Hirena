#!/bin/bash
# Kill any stale next dev processes
pkill -9 -x "next" 2>/dev/null || true
sleep 2

cd /Users/ossamamokhtar/hirena

echo "=== TypeScript check ==="
npx tsc --noEmit 2>&1
TSC_EXIT=$?

if [ $TSC_EXIT -ne 0 ]; then
  echo "ERROR: TypeScript errors found. Fix before continuing."
  exit 1
fi

echo "TypeScript: clean"

echo ""
echo "=== Starting dev server ==="
npm run dev > /tmp/hirena-dev.log 2>&1 &
DEV_PID=$!
echo "Dev server PID: $DEV_PID"

# Wait for server to be ready
for i in $(seq 1 30); do
  sleep 1
  if curl -s -o /dev/null http://localhost:3000/ 2>/dev/null; then
    echo "Server ready after ${i}s"
    break
  fi
done

echo ""
echo "=== HTTP status ==="
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:3000/

echo ""
echo "=== Verify-env endpoint ==="
curl -s http://localhost:3000/api/verify-env
echo ""

echo ""
echo "=== Test-assess endpoint (self-assessment, no AI) ==="
curl -s -X POST http://localhost:3000/api/assess \
  -H "Content-Type: application/json" \
  -d '{"targetRole":"Senior Product Manager","targetTrack":"product-management","region":"MENA","selfAssessment":{"product-vision":3,"agile-scrum":4,"roadmapping":3,"prioritization":3}}' \
  | python3 -m json.tool 2>/dev/null | head -20

echo ""
echo "=== Landing page content check ==="
curl -s http://localhost:3000/ > /tmp/hirena-home.txt
echo "Page length: $(wc -c < /tmp/hirena-home.txt) chars"
echo "Has 'See a demo assessment': $(grep -c 'See a demo assessment' /tmp/hirena-home.txt)"
echo "Has 'Start Free Assessment': $(grep -c 'Start Free Assessment' /tmp/hirena-home.txt)"
echo "Has 'Hirena': $(grep -c 'Hirena' /tmp/hirena-home.txt)"

echo ""
echo "=== Dev server log (last 20 lines) ==="
tail -20 /tmp/hirena-dev.log

echo ""
echo "=== Done ==="
echo "Dev server running at http://localhost:3000"
