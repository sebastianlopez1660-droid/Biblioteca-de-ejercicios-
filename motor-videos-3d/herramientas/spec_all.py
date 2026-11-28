import importlib.util, os
SPEC = {}
for n in ('spec_pr1.py', 'spec_pr2.py', 'spec_pr3.py'):
    s = importlib.util.spec_from_file_location(n[:-3], os.path.join(os.path.dirname(__file__), n)); m = importlib.util.module_from_spec(s); s.loader.exec_module(m); SPEC.update(m.SPEC)
