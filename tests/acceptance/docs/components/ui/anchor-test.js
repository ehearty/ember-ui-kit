import { test } from 'qunit';
import moduleForAcceptance from 'dummy/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | docs/components/ui/anchor');

test('visiting /docs/components/ui/anchor', async function(assert) {
  await visit('/docs/components/ui/anchor');

  assert.equal(currentURL(), '/docs/components/ui/anchor');
});
