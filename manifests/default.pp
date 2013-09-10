exec { "apt-get update":
  path => "/usr/bin"
}

file { "/etc/apt/sources.list.d/10gen.list":
  content => "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen\n",
  owner   => root,
  group   => root,
  mode    => 0644,
  notify  => Exec["apt-get update"]
}

exec { "apt-key 10gen":
  command => "/usr/bin/apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10",
  require => File["/etc/apt/sources.list.d/10gen.list"],
}

package { "mongodb-10gen":
  ensure => '2.2.0',
  require => [File["/etc/apt/sources.list.d/10gen.list"], Exec["apt-key 10gen"]],
}

service { "mongodb":
  ensure => "running",
  require => Package["mongodb-10gen"],
}

file { "/etc/apt/sources.list.d/maven.list":
  content => "deb http://ubuntu.mirror.cambrium.nl/ubuntu/ precise main universe",
  owner => root,
  group => root,
  mode => 0644,
  notify => Exec["apt-get update"],
}

package { "maven":
	ensure => installed,
	require => [File["/etc/apt/sources.list.d/maven.list"], Package["openjdk-7-jdk"]],
}

package { "openjdk-7-jdk":
  ensure => installed,
  require => Exec["apt-get update"],
}

package { "openjdk-6-jre":
  ensure => purged,
}

package { "icedtea-6-jre-cacao":
  ensure => purged,
}

package { "openjdk-6-jre-headless":
  ensure => purged,
}

package { "openjdk-6-jre-lib":
  ensure => purged,
}

