import { CustomerFilterPipe } from './customer-filter.pipe';

describe('CustomerFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new CustomerFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
