-- Create users table for additional user data
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  date_of_birth DATE,
  risk_tolerance TEXT CHECK (risk_tolerance IN ('low', 'medium', 'high')),
  investment_experience TEXT CHECK (investment_experience IN ('beginner', 'intermediate', 'advanced')),
  annual_income DECIMAL(12,2),
  net_worth DECIMAL(12,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create investment_plans table
CREATE TABLE IF NOT EXISTS investment_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  expected_return_min DECIMAL(5,2),
  expected_return_max DECIMAL(5,2),
  min_investment DECIMAL(12,2) NOT NULL,
  duration_months INTEGER,
  risk_level TEXT CHECK (risk_level IN ('low', 'medium', 'high')),
  category TEXT,
  features TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_investments table
CREATE TABLE IF NOT EXISTS user_investments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  plan_id UUID REFERENCES investment_plans(id) NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  status TEXT CHECK (status IN ('pending', 'active', 'completed', 'cancelled')) DEFAULT 'pending',
  invested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  maturity_date DATE,
  current_value DECIMAL(12,2),
  profit_loss DECIMAL(12,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  investment_id UUID REFERENCES user_investments(id),
  type TEXT CHECK (type IN ('investment', 'withdrawal', 'dividend', 'fee')) NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  status TEXT CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')) DEFAULT 'pending',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create portfolio_snapshots table for tracking portfolio value over time
CREATE TABLE IF NOT EXISTS portfolio_snapshots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  total_value DECIMAL(12,2) NOT NULL,
  total_invested DECIMAL(12,2) NOT NULL,
  profit_loss DECIMAL(12,2) NOT NULL,
  snapshot_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_snapshots ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own data" ON users FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own investments" ON user_investments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own investments" ON user_investments FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own transactions" ON transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own transactions" ON transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own portfolio snapshots" ON portfolio_snapshots FOR SELECT USING (auth.uid() = user_id);

-- Investment plans are public (readable by all authenticated users)
CREATE POLICY "Investment plans are viewable by authenticated users" ON investment_plans FOR SELECT TO authenticated USING (is_active = true);

-- Create indexes for better performance
CREATE INDEX idx_user_investments_user_id ON user_investments(user_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_portfolio_snapshots_user_id ON portfolio_snapshots(user_id);
CREATE INDEX idx_portfolio_snapshots_date ON portfolio_snapshots(snapshot_date);
