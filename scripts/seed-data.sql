-- Insert sample investment plans
INSERT INTO investment_plans (name, description, expected_return_min, expected_return_max, min_investment, duration_months, risk_level, category, features) VALUES
('Conservative Growth', 'Low-risk investment focused on steady, long-term growth with capital preservation.', 6.00, 8.00, 500, 12, 'low', 'Bonds & Fixed Income', ARRAY['Capital Protection', 'Steady Returns', 'Low Volatility']),
('Balanced Portfolio', 'Diversified mix of stocks and bonds designed for moderate growth with balanced risk.', 10.00, 12.00, 1000, 18, 'medium', 'Mixed Assets', ARRAY['Diversified Assets', 'Professional Management', 'Quarterly Rebalancing']),
('Tech Growth Fund', 'High-growth technology stocks with potential for significant returns and higher volatility.', 15.00, 20.00, 2000, 24, 'high', 'Technology Stocks', ARRAY['High Growth Potential', 'Tech Focus', 'Active Management']),
('Dividend Champions', 'Portfolio of dividend-paying stocks from established companies with consistent payouts.', 8.00, 10.00, 750, 12, 'low', 'Dividend Stocks', ARRAY['Regular Dividends', 'Blue Chip Stocks', 'Income Focus']),
('Emerging Markets', 'Exposure to high-growth emerging market economies with significant upside potential.', 12.00, 18.00, 1500, 36, 'high', 'International', ARRAY['Global Diversification', 'High Growth Markets', 'Currency Exposure']),
('ESG Sustainable', 'Environmentally and socially responsible investments with strong governance practices.', 9.00, 11.00, 1000, 24, 'medium', 'ESG/Sustainable', ARRAY['ESG Compliant', 'Sustainable Focus', 'Impact Investing']);

-- Create a function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at columns
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_investment_plans_updated_at BEFORE UPDATE ON investment_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_investments_updated_at BEFORE UPDATE ON user_investments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
