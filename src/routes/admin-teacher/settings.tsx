import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin-teacher/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col gap-6 px-4 py-4">
      {/* Page header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-base-content text-2xl leading-7 font-bold sm:truncate sm:text-3xl sm:tracking-tight">
            Configuration (Mocked)
          </h2>
          <p className="text-base-content/70 text-sm">
            General platform configuration, AI, and system preferences
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button className="btn btn-primary">
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <ul className="menu bg-base-200 rounded-box">
                <li>
                  <a className="active">General</a>
                </li>
                <li>
                  <a>AI Configuration</a>
                </li>
                <li>
                  <a>Users and Permissions</a>
                </li>
                <li>
                  <a>Integrations</a>
                </li>
                <li>
                  <a>Notifications</a>
                </li>
                <li>
                  <a>Security</a>
                </li>
                <li>
                  <a>Backup and Restore</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Settings Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* General Settings */}
          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <h3 className="card-title">General Configuration</h3>
              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Platform Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Sumak IA"
                    className="input input-bordered w-full"
                    defaultValue="Sumak IA"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-24"
                    placeholder="Platform description"
                    defaultValue="Educational platform with artificial intelligence for Latin America"
                  ></textarea>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Time Zone</span>
                  </label>
                  <select className="select select-bordered w-full">
                    <option disabled>Select time zone</option>
                    <option selected>GMT-4 (La Paz, Bolivia)</option>
                    <option>GMT-5 (Lima, Peru)</option>
                    <option>GMT-3 (Buenos Aires, Argentina)</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Default Language</span>
                  </label>
                  <select className="select select-bordered w-full">
                    <option selected>Spanish</option>
                    <option>Quechua</option>
                    <option>Aymara</option>
                    <option>English</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* AI Configuration */}
          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <h3 className="card-title">AI Configuration</h3>
              <div className="space-y-4">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">
                      Enable Automatic Adaptation
                    </span>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked
                      readOnly
                    />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Dropout Prediction</span>
                    <input
                      type="checkbox"
                      className="toggle toggle-warning"
                      checked
                      readOnly
                    />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">
                      Automatic Content Generation
                    </span>
                    <input
                      type="checkbox"
                      className="toggle toggle-secondary"
                      checked
                      readOnly
                    />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">AI Aggressiveness Level</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    defaultValue="3"
                    className="range range-primary"
                  />
                  <div className="flex w-full justify-between px-2 text-xs">
                    <span>Conservative</span>
                    <span>Moderate</span>
                    <span>Aggressive</span>
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Analysis Frequency (hours)
                    </span>
                  </label>
                  <input
                    type="number"
                    placeholder="24"
                    className="input input-bordered w-full"
                    defaultValue="24"
                    min="1"
                    max="168"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Performance Settings */}
          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <h3 className="card-title">Performance Configuration</h3>
              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Maximum Students per Session
                    </span>
                  </label>
                  <input
                    type="number"
                    placeholder="100"
                    className="input input-bordered w-full"
                    defaultValue="100"
                    min="10"
                    max="1000"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Content Cache (days)</span>
                  </label>
                  <input
                    type="number"
                    placeholder="7"
                    className="input input-bordered w-full"
                    defaultValue="7"
                    min="1"
                    max="30"
                  />
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Data Compression</span>
                    <input
                      type="checkbox"
                      className="toggle toggle-accent"
                      checked
                      readOnly
                    />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Low Bandwidth Mode</span>
                    <input type="checkbox" className="toggle toggle-info" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <h3 className="card-title">Notification Configuration</h3>
              <div className="space-y-4">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Dropout Alerts</span>
                    <input
                      type="checkbox"
                      className="toggle toggle-error"
                      checked
                      readOnly
                    />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Weekly Reports</span>
                    <input
                      type="checkbox"
                      className="toggle toggle-success"
                      checked
                      readOnly
                    />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">System Notifications</span>
                    <input
                      type="checkbox"
                      className="toggle toggle-neutral"
                      checked
                      readOnly
                    />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Email for Critical Alerts
                    </span>
                  </label>
                  <input
                    type="email"
                    placeholder="admin@sumak.edu"
                    className="input input-bordered w-full"
                    defaultValue="admin@sumak.edu"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="card bg-base-200 shadow">
            <div className="card-body">
              <h3 className="card-title">Security Configuration</h3>
              <div className="space-y-4">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">
                      Two-Factor Authentication
                    </span>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked
                      readOnly
                    />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Session Time (minutes)</span>
                  </label>
                  <input
                    type="number"
                    placeholder="480"
                    className="input input-bordered w-full"
                    defaultValue="480"
                    min="30"
                    max="1440"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Maximum Login Attempts</span>
                  </label>
                  <input
                    type="number"
                    placeholder="5"
                    className="input input-bordered w-full"
                    defaultValue="5"
                    min="3"
                    max="10"
                  />
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Activity Logging</span>
                    <input
                      type="checkbox"
                      className="toggle toggle-secondary"
                      checked
                      readOnly
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="card bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-xl">
            <div className="card-body">
              <h3 className="card-title text-white">System Status</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <div className="text-sm opacity-75">Last Update</div>
                  <div className="text-lg font-bold">2025-09-08 14:32</div>
                </div>
                <div>
                  <div className="text-sm opacity-75">Version</div>
                  <div className="text-lg font-bold">v2.3.1</div>
                </div>
                <div>
                  <div className="text-sm opacity-75">Uptime</div>
                  <div className="text-lg font-bold">99.8%</div>
                </div>
                <div>
                  <div className="text-sm opacity-75">Active Users</div>
                  <div className="text-lg font-bold">1,247</div>
                </div>
              </div>
              <div className="card-actions mt-4 justify-end">
                <button className="btn btn-neutral">View Logs</button>
                <button className="btn btn-secondary">Backup Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
